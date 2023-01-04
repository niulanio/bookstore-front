import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Livro } from "../livro.models";
import { LivroService } from "../livro.service";

@Component({
  selector: "app-livro-update",
  templateUrl: "./livro-update.component.html",
  styleUrls: ["./livro-update.component.css"],
})
export class LivroUpdateComponent implements OnInit {
  livro: Livro = {
    id: "",
    titulo: "",
    nome_autor: "",
    texto: "",
  };

  id_cat: String = "";

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
    this.livro.id = this.route.snapshot.paramMap.get("id")!;
    this.findById()
  }

  findById(){
    this.service.findById(this.livro.id!).subscribe((response)=>{
      this.livro=response
    }
    )
  }

  update(): void {
    this.service.update(this.livro).subscribe(
      (response) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem("Livro atualizado com sucesso!");
      },
      (err) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem("Erro ao atualizar Livro");
      }
    );
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
