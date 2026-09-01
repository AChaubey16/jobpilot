package com.jobpilot.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Value("${jobpilot.rabbitmq.exchange:jobpilot.exchange}")
    private String exchangeName;

    @Value("${jobpilot.rabbitmq.queues.application:jobpilot.application.queue}")
    private String applicationQueueName;

    @Value("${jobpilot.rabbitmq.routing-keys.application:jobpilot.application.routing}")
    private String applicationRoutingKey;

    @Value("${jobpilot.rabbitmq.queues.scanner:jobpilot.scanner.queue}")
    private String scannerQueueName;

    @Value("${jobpilot.rabbitmq.routing-keys.scanner:jobpilot.scanner.routing}")
    private String scannerRoutingKey;

    @Bean
    public DirectExchange exchange() {
        return new DirectExchange(exchangeName);
    }

    @Bean
    public Queue applicationQueue() {
        return QueueBuilder.durable(applicationQueueName).build();
    }

    @Bean
    public Queue scannerQueue() {
        return QueueBuilder.durable(scannerQueueName).build();
    }

    @Bean
    public Binding applicationBinding(Queue applicationQueue, DirectExchange exchange) {
        return BindingBuilder.bind(applicationQueue).to(exchange).with(applicationRoutingKey);
    }

    @Bean
    public Binding scannerBinding(Queue scannerQueue, DirectExchange exchange) {
        return BindingBuilder.bind(scannerQueue).to(exchange).with(scannerRoutingKey);
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter());
        return template;
    }
}
