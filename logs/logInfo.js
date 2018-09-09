var bunyan = require('bunyan');
var domain = require('domain');
var debug = require('debug')('http');
const util = require('util');



function getLogger() {
    'use strict';
    return bunyan.createLogger({
        name: "slf",
        streams: [{
                stream: process.stdout,
                level: 'debug'
            },
            {
                path: './logData/info.log',
                //type: 'rotating-file',
                period: '1d',
                count: 2,
                level: 'info'
            },
            {
                path: './logData/error.log',
                period: '2d',
                count: 5,
                level: 'error'
            },

        ],
        serializers: {
            req: bunyan.stdSerializers.req,
            res: bunyan.stdSerializers.res
        },
        level: process.env.LOG_LEVEL
    });
};

var loghelper = module.exports = {
    logger: getLogger(),

    requestLogger: function (req, res, next) {
        'use strict';

        var start = new Date();
        var end = res.end;
        res.end = function (chunk, encoding) {
            var responseTime = (new Date()).getTime() - start.getTime();
            end.call(res, chunk, encoding);
            var contentLength = parseInt(res.getHeader('Content-Length'), 10);
            var data = {
                res: res,
                req: req,
                responseTime: responseTime,
                contentLength: isNaN(contentLength) ? 0 : contentLength
            };
            // loghelper.logger.info(data, '%s %s %d %dms - %d', data.req.method, data.req.url, data.res.statusCode, data.responseTime, data.contentLength);
            debug(data);
            debug(util.format('%s %s %d %dms - %d', data.req.method, data.req.url, data.res.statusCode, data.responseTime, data.contentLength));
        };
        next();
    },

    errorLogger: function (err, req, res, next) {
        'use strict';
        loghelper.logger.error({
            req: req,
            res: res,
            error: err
        }, err.stack);
        next(err);
    },


    fatalErrorLogger: function (req, res, next) {
        'use strict';
        var requestDomain = domain.create();
        requestDomain.add(req);
        requestDomain.add(res);
        requestDomain.on('error', function (err) {
            var data = {
                req: req,
                res: res,
                error: err
            };
            loghelper.logger.fatal(data, err.message);
        });
        next();
    },


    logMetrics: function () {
        setInterval(function () {
            'use strict';
            var startTime = Date.now();
            setImmediate(function () {
                var data = process.memoryUsage();
                data.uptime = process.uptime();
                data.pid = process.pid;
                data.tags = ['process-metrics'];
                data.lag = Date.now() - startTime;
                loghelper.logger.info(data,
                    'process.pid: %d heapUsed: %d heapTotal: %d rss: %d uptime %d lag: %d',
                    data.pid,
                    data.heapUsed,
                    data.heapTotal,
                    data.rss,
                    data.uptime,
                    data.lag
                );
            });
        }, process.env.LOG_metricintervalinMilliSeconds);
    }
}