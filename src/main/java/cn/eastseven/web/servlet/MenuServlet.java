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

public class MenuServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	static final String driverClass = "com.mysql.jdbc.Driver";
	static final String jdbcUrl = "jdbc:mysql://127.0.0.1:3306/test";
	static final String username = "root";
	static final String password = "1983722";
	
    public MenuServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String sql = "select * from jd_menu where 1=1 ";
		String id = request.getParameter("id");
		if(StringUtils.isEmpty(id)) {
			sql += " and menu_level = 1 and menu_pid = 0";
		} else {
			sql += " and menu_pid = " + id;
		}
		
		String json = "";
		try {
			json = loadData(sql);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		System.out.println(json);
		
		response.setContentType("text/html;charset=UTF-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter writer = response.getWriter();
		writer.print(json);
		writer.flush();
		writer.close();
	}

	private String loadData(String sql) throws SQLException {
		DruidDataSource druid = new DruidDataSource();
		druid.setDriverClassName(driverClass);
		druid.setUrl(jdbcUrl);
		druid.setUsername(username);
		druid.setPassword(password);
		
		List<Menu> result = new ArrayList<MenuServlet.Menu>();
		
		Connection conn = druid.getConnection();
		PreparedStatement pst = null;
		ResultSet rs = null;
		
		try {
			
			pst = conn.prepareStatement(sql);
			rs  = pst.executeQuery();
			
			while(rs.next()) {
				Menu menu = new Menu();
				menu.setId(rs.getInt("menu_id"));
				menu.setPid(rs.getInt("menu_pid"));
				menu.setText(rs.getString("menu_name"));
				menu.setLevel(rs.getInt("menu_level"));
				menu.setUrl(rs.getString("menu_url"));
				if(menu.isLeaf()) {
					menu.setState("undefined");
				}
				menu.getAttributes().put("url", rs.getString("menu_url"));
				result.add(menu);
			}
		
			rs.close();
			pst.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		System.out.println(sql+" : "+result.size());
		
		String json = JSON.toJSONString(result);
		druid.close();
		return json;
	}
	
	class Menu {
		private int id;
		private int pid;
		private int level;
		
		private String url          = "";
		private String text         = "";
		private String state        = "closed";
		private boolean checked     = false;
		private List<Menu> children = new ArrayList<MenuServlet.Menu>();
		
		private Map<String, String> attributes = new HashMap<String, String>();
		
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public int getPid() {
			return pid;
		}
		public void setPid(int pid) {
			this.pid = pid;
		}
		public String getText() {
			return text;
		}
		public void setText(String text) {
			this.text = text;
		}
		public String getState() {
			return state;
		}
		public void setState(String state) {
			this.state = state;
		}
		public boolean isChecked() {
			return checked;
		}
		public void setChecked(boolean checked) {
			this.checked = checked;
		}
		public List<Menu> getChildren() {
			return children;
		}
		public void addMenu(Menu menu) {
			this.children.add(menu);
		}
		public void setChildren(List<Menu> children) {
			this.children = children;
		}
		public int getLevel() {
			return level;
		}
		public void setLevel(int level) {
			this.level = level;
		}
		public boolean isLeaf() {
			return this.level == 3;
		}
		public void setUrl(String url) {
			this.url = url;
		}
		public String getUrl() {
			return url;
		}
		public Map<String, String> getAttributes() {
			return attributes;
		}
		public void setAttributes(Map<String, String> attributes) {
			this.attributes = attributes;
		}
	}
}
