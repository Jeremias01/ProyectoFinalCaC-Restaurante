package data;

import java.sql.*;
import javax.sql.DataSource;
import org.apache.commons.dbcp2.BasicDataSource;

public class Conexionlogin {
    private static final String DB_CON = "jdbc:mysql://localhost:3306/login?serverTimezone=UTC&useSSL=false&useUnicode=yes&characterEncoding=UTF-8";
    private static final String DB_USER = "";
    private static final String DB_PASS = "";
    
   public static DataSource getDataSourcelogin(){
       BasicDataSource ds = new BasicDataSource();
       ds.setUrl(DB_CON);
       ds.setUsername(DB_USER);
       ds.setPassword(DB_PASS);
       
       ds.setInitialSize(100);
       return ds;
       
   }
    public static Connection getConexionlogin() throws SQLException, ClassNotFoundException{
      
            //Class.forName("com.mysql.cj.jdbc.Driver");

        return getDataSourcelogin().getConnection();
    }
    
    public static void close(ResultSet rs) throws SQLException{
        rs.close();
    }
    
    public static void close(Statement st) throws SQLException{
        st.close();
    }
    
    public static void close(Connection cn) throws SQLException{
        cn.close();
    }   
       

}

