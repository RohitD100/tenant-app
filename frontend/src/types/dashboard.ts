/**
 * Represents a metric with a label and a value.
 * 
 * @interface Metric
 * @property {string} label - The name or description of the metric.
 * @property {number} value - The numerical value associated with the metric.
 */
export interface Metric {
  label: string;
  value: number;
}