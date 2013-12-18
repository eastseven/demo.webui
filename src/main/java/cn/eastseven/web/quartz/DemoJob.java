package cn.eastseven.web.quartz;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DemoJob implements Job {

	private static final Logger log = LoggerFactory.getLogger(DemoJob.class);
	
	public void execute(JobExecutionContext ctx) throws JobExecutionException {
		log.info(ctx.getJobDetail().getFullName() + " is execute ");
	}

}
