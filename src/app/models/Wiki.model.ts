import { Usuario } from './Usuario.model';

export class Wiki {
    public _id?: String;
    public usuario: Usuario;
    public fecha: Date;
    public tema: String;
    public titulo: String;
    public articulo: String;
    public imagenes?: String[];
    public comentarios?: Comentario[];

    constructor () {
        this._id = '';
        this.usuario = '';
        this.fecha = new Date();
        this.tema = '';
        this.titulo = '';
        this.articulo = '';
        this.imagenes = [];
        this.comentarios = [];
    }
}

export class Comentario {
    public _id?: String;
    public usuario: Usuario;
    public fecha: Date;
    public comentario: String;
    public imagenes?: String[];

    constructor () {
        this._id = '';
        this.usuario = '';
        this.fecha = new Date();
        this.comentario = '';
        this.imagenes = [];
    }
}
