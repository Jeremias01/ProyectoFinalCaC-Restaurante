
package model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Plato {
    private int platoId;
    private String nombre;
    private String descripcion;
    private String tipoPlato;
    private double precio;
    private byte[] imagen;
    private String imagenBase64;
    private boolean aptoCeliaco;
    private boolean aptoVegano;
    private boolean enFalta;

    //constructor para craer objeto para subir
    public Plato(String nombre, String descripcion, String tipoPlato, double precio, byte[] imagen, boolean aptoCeliaco, boolean aptoVegano, boolean enFalta) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.tipoPlato = tipoPlato;
        this.precio = precio;
        this.imagen = imagen;
        this.aptoCeliaco = aptoCeliaco;
        this.aptoVegano = aptoVegano;
        this.enFalta = enFalta;
    }

    //constructor para craer objeto para bajar
    public Plato(int platoId, String nombre, String descripcion, String tipoPlato, double precio, byte[] imagen, boolean aptoCeliaco, boolean aptoVegano, boolean enFalta) {
        this.platoId = platoId;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.tipoPlato = tipoPlato;
        this.precio = precio;
        this.imagen = imagen;
        this.aptoCeliaco = aptoCeliaco;
        this.aptoVegano = aptoVegano;
        this.enFalta = enFalta;
    }
}
