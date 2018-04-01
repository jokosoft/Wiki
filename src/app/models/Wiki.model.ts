import { Usuario } from './Usuario.model';

export class Wiki {
    public _id?: string;
    public usuario: Usuario;
    public fecha: Date;
    public tema: string;
    public titulo: string;
    public articulo: string;
    public imagenes?: string[];
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
    public _id?: string;
    public usuario: Usuario;
    public fecha: Date;
    public comentario: string;
    public imagenes?: string[];

    constructor () {
        this._id = '';
        this.usuario = '';
        this.fecha = new Date();
        this.comentario = '';
        this.imagenes = [];
    }
}
