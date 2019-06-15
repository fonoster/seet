package org.miniroutr.profiler;

import com.uber.profiling.Reporter;
import com.uber.profiling.util.JsonUtils;

import java.util.List;
import java.util.Map;

public class SocketReporter implements Reporter {
    @Override
    public void report(String profilerName, Map<String, Object> metrics) {
        System.out.println(JsonUtils.serialize(metrics));
    }

    @Override
    public void close() {
    }
}
