package cn.eastseven.web.servlet;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.util.Calendar;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.quartz.CronTrigger;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SimpleTrigger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import cn.eastseven.web.quartz.DemoJob;
import cn.eastseven.web.quartz.QuartzScheduler;

public class InitServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	private static final Logger log = LoggerFactory.getLogger(InitServlet.class);
	
    public InitServlet() {
        super();
    }

    @Override
    public void init(ServletConfig config) throws ServletException {
    	log.info("init config");
    	
    	String path = Thread.currentThread().getContextClassLoader().getResource("").getPath(); 
    	log.debug(path);
    	
    	File quartz = new File(path+"quartz.properties");
    	if(quartz.exists()) {
    		String filename = quartz.getName();
    		try {
				Scheduler scheduler = QuartzScheduler.getInstance(filename);
				String name = scheduler.getSchedulerName();
				
				scheduler.start();
				JobDetail jobDetail = new JobDetail("demoJobCron", DemoJob.class);
				CronTrigger cronTrigger = new CronTrigger("demoCronTrigger", QuartzScheduler.DEMO_GROUP, "0 0 12 * * ?"); //每天中午12点触发 
				scheduler.scheduleJob(jobDetail, cronTrigger);
				
				jobDetail = new JobDetail("demoJobSimple", DemoJob.class);
				SimpleTrigger simpleTrigger = new SimpleTrigger("demoSimpleTrigger", QuartzScheduler.DEMO_GROUP);
				simpleTrigger.setStartTime(Calendar.getInstance().getTime());
				simpleTrigger.setRepeatInterval(100000L);
				simpleTrigger.setRepeatCount(SimpleTrigger.REPEAT_INDEFINITELY);
				scheduler.scheduleJob(jobDetail, simpleTrigger);
				
				log.debug("schedule name: " + name + "\nrunning: " + scheduler.isStarted());
			} catch (SchedulerException e) {
				log.error(e.getMessage());
			} catch (ParseException e) {
				log.error(e.getMessage());
			}
    	}
    }
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}

}
