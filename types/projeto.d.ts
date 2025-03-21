declare namespace Projeto {
    type Usuario = {
        id?: number;
        nome: string;
        login: string;
        senha: string;
        email: string;
    };

    type Recurso = {
        id?: number;
        nome: string;
        chave: string;
    }

    type Perfil = {
        id?: number;
        descricao: string;
    }

    type PerfilUsuario = {
        id?: number;
        perfil: Perfil;
        usuario: Usuario;
    }

    type PermissaoPerfilRecurso = {
        id?: number;
        perfil: Perfil;
        recurso: Recurso;
    }

    type Reuniao = {
        id?: number;
        data: string;
        descricao: string;
        dataReuniao?: Date;	
    }
    type ConfirmaReuniao = {
        id?: number;
        reuniao: Reuniao;
        usuario: Usuario;
    }
}