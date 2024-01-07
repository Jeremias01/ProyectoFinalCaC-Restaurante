/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import data.UsuarioDao;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.*;
import jakarta.servlet.http.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.logging.Logger;
import model.Usuario;

@WebServlet("/login")
@MultipartConfig(
        location = "/media/temp",
        fileSizeThreshold = 1024 * 1024,
        maxFileSize = 1024 * 1024 * 5,
        maxRequestSize = 1024 * 1024 * 10
)
public class usuarioServletController extends HttpServlet {
        private static final Logger LOGGER = Logger.getLogger(usuarioServletController.class.getName());
    //public static final String HTML_START="<html><body>";
    //public static final String HTML_END="</body></html>";

    List<Usuario> usuarios = new ArrayList();
    ObjectMapper mapper = new ObjectMapper();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        String route = req.getParameter("action");
        try {
            switch (route) {
                case "getAll": {
                    res.setContentType("application/json; charset= UTF-8");
                    usuarios = UsuarioDao.seleccionarTodos();
                    // transforma menu a Json y envía al Front
                    mapper.writeValue(res.getWriter(), usuarios);
                    break;
                }
                
                case "getByNombre":
                    String nombreUsuario = req.getParameter("NombreUsuario");
                    Usuario usuarioUpdate = UsuarioDao.seleccionarPorNombre(nombreUsuario);
                    res.setContentType("application/json; charset=utf-8");
                    mapper.writeValue(res.getWriter(), usuarioUpdate);
                    break;
                
                default: {
                    System.out.println("parámetro no valido");
                }
            }
            System.out.println("Operación realizada con éxito");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error en la operación: " + e.getMessage());
            res.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error interno del servidor");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            req.setCharacterEncoding("UTF-8");

            String route = req.getParameter("action");

            switch (route) {                
                case "add":                    
                    String NombreUsuario = req.getParameter("Usuario");
                    String Contraseña = req.getParameter("Contraseña");
                    
                    Usuario nuevoUsuario = new Usuario(NombreUsuario, Contraseña);

                    UsuarioDao.insertar(nuevoUsuario);
                    break;
                    
                    case "edit":
                    String NombreUsuario2 = req.getParameter("Usuario");
                    String Contraseña2 = req.getParameter("Contraseña");
                    
                    Usuario nuevoUsuario2 = new Usuario(NombreUsuario2, Contraseña2);                                                         
                    
                    UsuarioDao.actualizar(nuevoUsuario2);
                    break;
            }            

            res.setStatus(HttpServletResponse.SC_OK);
        } catch (Exception e) {
            LOGGER.severe("Error al procesar la solicitud: " + e.getMessage());
            e.printStackTrace();
            res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {

    }

}
