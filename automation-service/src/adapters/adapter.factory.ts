import { BaseAtsAdapter } from './base.adapter.js';
import { GreenhouseAdapter } from './greenhouse.adapter.js';
import { LeverAdapter } from './lever.adapter.js';
import { WorkdayAdapter } from './workday.adapter.js';
import { CustomAdapter } from './custom.adapter.js';

export class AtsAdapterFactory {
  static getAdapter(atsType: string): BaseAtsAdapter {
    switch (atsType?.toUpperCase()) {
      case 'GREENHOUSE':
        return new GreenhouseAdapter();
      case 'LEVER':
        return new LeverAdapter();
      case 'WORKDAY':
        return new WorkdayAdapter();
      default:
        return new CustomAdapter();
    }
  }
}
