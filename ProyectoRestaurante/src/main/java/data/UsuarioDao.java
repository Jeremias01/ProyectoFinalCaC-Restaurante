package data;

import static data.Conexionlogin.*;
import java.sql.*;
import java.util.*;
import model.Usuario;

public class UsuarioDao {
    
    private static final String SQL_SELECT = "SELECT * FROM usuarios";
    private static final String SQL_SELECT_BY_NAME = "SELECT * FROM usuarios WHERE NombreUsuario = ?";
    private static final String SQL_INSERT = "INSERT INTO usuarios(NombreUsuario, Contraseña) VALUES(?, ?)";
    private static final String SQL_UPDATE = "UPDATE usuarios SET NombreUsuario = ?, Contraseña = ?";
//    private static final String SQL_LOGIC_DELETE = "UPDATE usuarios SET enFalta = ? WHERE platoId = ?";
   
    
    public static List<Usuario> seleccionarTodos() {
        Usuario usuario = null;
        List<Usuario> usuarios = new ArrayList();

        try (Connection conn = getConexionlogin(); // try with no necesita finally ni los close en Conexion
            PreparedStatement stmt = conn.prepareStatement(SQL_SELECT);
            ResultSet rs = stmt.executeQuery())
        {      
            while (rs.next()) {
                String NombreUsuario = rs.getString("NombreUsuario");
                String Contraseña = rs.getString("Contraseña");

                usuario = new Usuario(NombreUsuario, Contraseña);

                usuarios.add(usuario);
            }
        } catch (ClassNotFoundException | SQLException ex) {
            ex.printStackTrace(System.out);
        }
        return usuarios;
    }
    
    public static int insertar(Usuario usuario){
        System.out.println("Insertando usuario en la base de datos...");
        Connection conn = null;
        PreparedStatement stmt = null;
        int registros = 0;
        try {
            conn = getConexionlogin();
            stmt = conn.prepareStatement(SQL_INSERT);
          
            stmt.setString(1, usuario.getNombreDeUsuario());
            stmt.setString(2, usuario.getContraseña());
            
            registros = stmt.executeUpdate();
            System.out.println("Registros afectados: " + registros);
        } catch (ClassNotFoundException | SQLException ex) {
            ex.printStackTrace(System.out);
        }
        finally{
            try {
                close(stmt);
                close(conn);
            } catch (SQLException ex) {
                ex.printStackTrace(System.out);
            }
        }
        return registros;
    }
       
    public static int actualizar(Usuario usuario){
        Connection conn = null;
        PreparedStatement stmt = null;
        int registros = 0;
        try {
            conn = getConexionlogin();
            stmt = conn.prepareStatement(SQL_UPDATE);
            stmt.setString(1, usuario.getNombreDeUsuario());
            stmt.setString(2, usuario.getContraseña());
            
            registros = stmt.executeUpdate();
            
        } catch (ClassNotFoundException | SQLException ex) {
            ex.printStackTrace(System.out);
        }
        finally{
            try {
                close(stmt);
                close(conn);
            } catch (SQLException ex) {
                ex.printStackTrace(System.out);
            }
        }
        return registros;
    }
     
    public static Usuario seleccionarPorNombre(String nombreUsuario) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Usuario usuario = null;

        try {
            conn = getConexionlogin();
            stmt = conn.prepareStatement(SQL_SELECT_BY_NAME);
            stmt.setString(1, nombreUsuario);
            rs = stmt.executeQuery();
            
            while (rs.next()) {
                String nombreusuario = rs.getString("NombreUsuario");
                String contraseña = rs.getString("Contraseña");

                usuario = new Usuario(nombreusuario, contraseña);

            }
        } catch (ClassNotFoundException | SQLException ex) {
            ex.printStackTrace(System.out);
        } finally {
            try {
                close(rs);
                close(stmt);
                close(conn);
            } catch (SQLException ex) {
                ex.printStackTrace(System.out);
            }
        }
        return usuario;
    }
    
    // controlar este método
//     public int altaBajaLogica(boolean enFalta, int id){
//        Connection conn = null;
//        PreparedStatement stmt = null;
//        int registros = 0;
//        try {
//            conn = getConexion();
//            stmt = conn.prepareStatement(SQL_LOGIC_DELETE);
//            stmt.setBoolean(1, !enFalta);
//            stmt.setInt(2, id);
//            
//            registros = stmt.executeUpdate();
//            
//        } catch (ClassNotFoundException | SQLException ex) {
//            ex.printStackTrace(System.out);
//        }
//        finally{
//            try {
//                close(stmt);
//                close(conn);
//            } catch (SQLException ex) {
//                ex.printStackTrace(System.out);
//            }
//        }
//        return registros;
//    }
}
