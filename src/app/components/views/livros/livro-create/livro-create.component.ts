import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Livro } from "../livro.models";
import { LivroService } from "../livro.service";

@Component({
  selector: "app-livro-create",
  templateUrl: "./livro-create.component.html",
  styleUrls: ["./livro-create.component.css"],
})
export class LivroCreateComponent implements OnInit {
  livro: Livro = {
    id: "",
    titulo: "",
    nome_autor: "",
    texto: "",
  };

  id_cat :String = ''

  titulo = new FormControl("", [Validators.minLength(3)]);
  nome_autor = new FormControl("", [Validators.minLength(3)]);
  texto = new FormControl("", [Validators.minLength(1)]);

  constructor(
    private service: LivroService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
  }



    create():void{
      this.service.create(this.livro,this.id_cat).subscribe((response)=>{
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem("Livro cadastrado com sucesso!");
      },err =>{
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem("Erro ao cadastrar Livro");
      }
      )
    }


  getMessageTitulo() {
    if (this.titulo.invalid) {
      return "O campo TITULO deve conter entre 3 e 100 caracteres";
    }
    return false;
  }
  getMessageNomeAutor() {
    if (this.nome_autor.invalid) {
      return "O campo NOME DO AUTOR deve conter entre 3 e 50 caracteres";
    }
    return false;
  }
  getMessageTexto() {
    if (this.texto.invalid) {
      return "O campo TEXTO deve conter entre 1 e 2.000.000 caracteres";
    }
    return false;
  }


  voltar() {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }
}
