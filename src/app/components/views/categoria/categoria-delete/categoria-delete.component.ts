import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Categoria } from "../categoria.model";
import { CategoriaService } from "../categoria.service";

@Component({
  selector: "app-categoria-delete",
  templateUrl: "./categoria-delete.component.html",
  styleUrls: ["./categoria-delete.component.css"],
})
export class CategoriaDeleteComponent implements OnInit {
  categoria: Categoria = {
    id: "",
    nome: "",
    descricao: "",
  };

  constructor(
    private service: CategoriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe((response) => {
      this.categoria = response;
    });
  }

  deletar(): void {
    this.service.delete(this.categoria.id!).subscribe(
      (response) => {
        this.router.navigate(["categorias"]);
        this.service.mensagem("Categorria deletada com sucesso");
      },
      (err) => {
          this.service.mensagem(err.error.error);
        }  
    );
  }

  voltar() {
    this.router.navigate(["categorias"]);
  }
}
