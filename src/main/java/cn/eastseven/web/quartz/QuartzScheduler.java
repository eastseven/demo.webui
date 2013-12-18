package cn.eastseven.web.quartz;

import org.apache.commons.lang3.StringUtils;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.impl.StdSchedulerFactory;

public final class QuartzScheduler {

	public static final String DEMO_GROUP = "DEMO";
	
	private static Scheduler scheduler = null;
	
	private QuartzScheduler() {}
	
	public static Scheduler getInstance(String config) {
		if(scheduler == null) {
			if(StringUtils.isNotBlank(config)) {
				try {
					scheduler = new StdSchedulerFactory(config).getScheduler();
				} catch (SchedulerException e) {
					e.printStackTrace();
				}
			} else {
				try {
					scheduler = new StdSchedulerFactory().getScheduler();
				} catch (SchedulerException e) {
					e.printStackTrace();
				}
			}
		}
		
		return scheduler;
	}
}
