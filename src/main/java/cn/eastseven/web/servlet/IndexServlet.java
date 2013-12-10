package cn.eastseven.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.util.StringUtils;
import com.alibaba.fastjson.JSON;

public class IndexServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	static final String driverClass = "com.mysql.jdbc.Driver";
	static final String jdbcUrl = "jdbc:mysql://127.0.0.1:3306/test";
	static final String username = "root";
	static final String password = "1983722";
	
	//column0,column1,column13,column15,column16,column19,column20,column21,column22
	final String sql = "select * from san_guo_zhi where column1 is not null ";
	
    public IndexServlet() {
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		int page = StringUtils.isEmpty(request.getParameter("page")) ? 1 : Integer.valueOf(request.getParameter("page"));
		int rows = StringUtils.isEmpty(request.getParameter("rows")) ? 10 : Integer.valueOf(request.getParameter("rows"));
		String sort = request.getParameter("sort");
		String order = request.getParameter("order");
		String searchField = request.getParameter("searchField");
		String searchValue = request.getParameter("searchValue");
		
		int end = 0;
		
		if(page > 1) {
			end = (page - 1) * rows;
		}
		
		String json = "";
		try {
			String where = "";
			if(!StringUtils.isEmpty(searchField) && !StringUtils.isEmpty(searchValue)) {
				searchValue = new String(searchValue.getBytes("iso-8859-1"), "utf-8");
				where = " and "+searchField+" like '"+searchValue+"%' ";
				end = 0;
			}
			String orderby = "";
			if(!StringUtils.isEmpty(order) && !StringUtils.isEmpty(sort)) orderby = " order by " + sort + " " + order;
			String limit = " limit " + end + "," + rows;
			String select = sql + where + orderby + limit;
			System.out.println(select);
			json = loadData(select);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		response.setContentType("text/html;charset=UTF-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter writer = response.getWriter();
		writer.print(json);
		writer.flush();
		writer.close();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

	private String loadData(String sql) throws SQLException {
		DruidDataSource druid = new DruidDataSource();
		druid.setDriverClassName(driverClass);
		druid.setUrl(jdbcUrl);
		druid.setUsername(username);
		druid.setPassword(password);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		Connection conn = druid.getConnection();
		PreparedStatement pst = null;
		ResultSet rs = null;
		
		pst = conn.prepareStatement("select count(1) from san_guo_zhi where column1 is not null ");
		rs = pst.executeQuery();
		if(rs.next()) {
			result.put("total", rs.getObject(1));
		}
		pst.clearParameters();
		
		pst = conn.prepareStatement(sql);
		rs = pst.executeQuery();
		int column = 70;
		List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
		Map<String, Object> map = null;
		while(rs.next()) {
			map = new HashMap<String, Object>();
			for(int index = 0; index < column; index++) {
				Object val = rs.getObject(index+1);
				map.put("column"+index, val == null ? "" : val);
			}
			list.add(map);
		}
		result.put("rows", list);
		
		druid.close();
		
		String json = JSON.toJSONString(result);
		
		return json;
	}
}
