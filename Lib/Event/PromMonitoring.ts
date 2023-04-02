//const client = require('prom-client');
import * as client from 'prom-client'
//console.dir(client)
// const express = require('express');
// const server = express();
const register = new client.Registry();
// Probe every 5th second.
let promConfig:client.DefaultMetricsCollectorConfiguration  =  {
      prefix:'node_',
     //timeout: 5000,
     eventLoopMonitoringPrecision:5000,
    register,
    labels:{'app':"sytem-metric"}
    
}
const intervalCollector = client.collectDefaultMetrics(  promConfig );
const counter = new client.Counter({
 name: "node_my_counter",
 help: "This is my counter"
});
const gauge = new client.Gauge({
 name: "node_my_gauge",
 help: "This is my gauge"
});
const histogram = new client.Histogram({
 name: "node_my_histogram",////type
 help: "This is my histogram",///description
 buckets: [0.1, 5, 15, 50, 100, 500]  //[<0.1,< 0.5,<0.10,<0.15,<0.20]
});
const summary = new client.Summary({
 name: "node_my_summary",
 help: "This is my summary",
 percentiles: [0.01, 0.05, 0.5, 0.9, 0.95, 0.99, 0.999]
});
const promMetricType  = {
    counter:register.registerMetric(counter),
    gauge:register.registerMetric(gauge),
    histogram:register.registerMetric(histogram),
    summary: register.registerMetric(summary)
}
export default promMetricType 
