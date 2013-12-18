package cn.eastseven.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import cn.eastseven.web.quartz.QuartzScheduler;

import com.alibaba.fastjson.JSON;
import com.google.common.collect.Lists;

public class QuartzServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private static final Logger log = LoggerFactory.getLogger(QuartzServlet.class);

	public QuartzServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String method = request.getParameter("m");

		if ("index".equals(method)) {
			index(request, response);
		}
	}

	private void index(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<Trigger> list = Lists.newArrayList();
		Scheduler s = QuartzScheduler.getInstance(null);
		try {
			String[] groupNames = s.getTriggerGroupNames();
			for (String triggerGroup : groupNames) {
				String[] triggerNames = s.getTriggerNames(triggerGroup);
				for (String triggerName : triggerNames) {
					Trigger trigger = s.getTrigger(triggerName, triggerGroup);
					list.add(trigger);
				}
			}
		} catch (SchedulerException e) {
			e.printStackTrace();
		}

		String json = JSON.toJSONString(list);
		
		log.debug(json);
		
		response.setContentType("text/html;charset=UTF-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter writer = response.getWriter();
		writer.print(json);
		writer.flush();
		writer.close();
	}
}
