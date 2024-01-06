
package data;

import static data.Conexion.*;
import java.sql.*;
import java.util.*;
import model.Plato;


public class PlatoDao {
    
    private static final String SQL_SELECT = "SELECT * FROM platos";
    private static final String SQL_SELECT_BY_ID = "SELECT * FROM platos WHERE platoId = ?";
    private static final String SQL_INSERT = "INSERT INTO platos(nombre, descripcion, tipoPlato, precio, imagen, aptoCeliaco, aptoVegano, enFalta) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
    private static final String SQL_UPDATE = "UPDATE platos SET nombre = ?, descripcion = ?, tipoPlato = ?, precio = ?, imagen = ?, aptoCeliaco = ?, aptoVegano = ?, enFalta = ? WHERE platoId= ?";
   
    
    public static List<Plato> seleccionarTodos() {
        Plato plato = null;
        List<Plato> menu = new ArrayList();
        Blob blob = null;
        byte[] imagen = null;

        try (Connection conn = getConexion(); // try with no necesita finally ni los close en Conexion
            PreparedStatement stmt = conn.prepareStatement(SQL_SELECT);
            ResultSet rs = stmt.executeQuery())
        {      
            while (rs.next()) {
                int platoId = rs.getInt(1);
                String nombre = rs.getString("nombre");
                String descripcion = rs.getString("descripcion");
                String tipoPlato = rs.getString("tipoPlato");
                double precio = rs.getDouble("precio");
                
                if (rs.getBlob("imagen") != null){
                    blob = rs.getBlob("imagen");
                    imagen = blob.getBytes(1, (int)blob.length());
                }
                                
                boolean aptoCeliaco = rs.getBoolean("aptoCeliaco");
                boolean aptoVegano = rs.getBoolean("aptoVegano");
                boolean enFalta = rs.getBoolean("enFalta");

                plato = new Plato(platoId, nombre, descripcion, tipoPlato, precio, imagen, aptoCeliaco, aptoVegano, enFalta);

                menu.add(plato);
            }
        } catch (ClassNotFoundException | SQLException ex) {
            ex.printStackTrace(System.out);
        }
        return menu;
    }
    
    public static int insertar(Plato plato){
        System.out.println("Insertando plato en la base de datos...");
        Connection conn = null;
        PreparedStatement stmt = null;
        int registros = 0;
        try {
            conn = getConexion();
            stmt = conn.prepareStatement(SQL_INSERT);
          
            stmt.setString(1, plato.getNombre());
            stmt.setString(2, plato.getDescripcion());
            stmt.setString(3,plato.getTipoPlato());
            stmt.setDouble(4, plato.getPrecio());
            
            Blob blob = conn.createBlob();
            blob.setBytes(1,plato.getImagen());
            stmt.setBlob(5, blob);
            
            stmt.setBoolean(6, plato.isAptoCeliaco());
            stmt.setBoolean(7, plato.isAptoVegano());
            stmt.setBoolean(8,plato.isEnFalta());
            
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
       
    public static int actualizar(Plato plato){
        Connection conn = null;
        PreparedStatement stmt = null;
        int registros = 0;
        try {
            conn = getConexion();
            stmt = conn.prepareStatement(SQL_UPDATE);
         stmt.setString(1, plato.getNombre());
            stmt.setString(2, plato.getDescripcion());
            stmt.setString(3,plato.getTipoPlato());
            stmt.setDouble(4, plato.getPrecio());
            
            Blob blob = conn.createBlob();
            blob.setBytes(1,plato.getImagen());
            stmt.setBlob(5, blob);
            
            stmt.setBoolean(6, plato.isAptoCeliaco());
            stmt.setBoolean(7, plato.isAptoVegano());
            stmt.setBoolean(8,plato.isEnFalta());
            stmt.setInt(9, plato.getPlatoId());
            
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
     
    public static Plato seleccionarPorId(int id) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Plato plato = null;

        try {
            conn = getConexion();
            stmt = conn.prepareStatement(SQL_SELECT_BY_ID);
            stmt.setInt(1, id);
            rs = stmt.executeQuery();
            
            while (rs.next()) {
                int platoId = rs.getInt(1);
                String nombre = rs.getString("nombre");
                String descripcion = rs.getString("descripcion");
                String tipoPlato = rs.getString("tipoPlato");
                double precio = rs.getDouble("precio");
                
                Blob blob = rs.getBlob("imagen");
                byte[] imagen = blob.getBytes(1, (int)blob.length());
                
                boolean aptoCeliaco = rs.getBoolean("aptoCeliaco");
                boolean aptoVegano = rs.getBoolean("aptoVegano");
                boolean enFalta = rs.getBoolean("enFalta");

                plato = new Plato(platoId, nombre, descripcion, tipoPlato, precio, imagen, aptoCeliaco, aptoVegano, enFalta);

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
        return plato;
    }
}
