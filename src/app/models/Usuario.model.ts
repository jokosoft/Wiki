export class Usuario {

    constructor(
        public uid?: string,
        public nombre?: string,
        public email?: string,
        public img?: string,
        public auth?: boolean,
        public password?: string,
        public role?: string,
        public _id?: string
    ) { }

    public toString = (): string => {

        return `Usuario (uid: ${this.uid}, nombre: ${this.nombre}, email: ${this.email}, img: ${this.img})`;
    }

}
