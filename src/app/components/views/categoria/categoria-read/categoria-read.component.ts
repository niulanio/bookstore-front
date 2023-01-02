import { Component, OnInit } from "@angular/core";
import { Categoria } from "../categoria.model";
import { CategoriaService } from "../categoria.service";

@Component({
  selector: "app-categoria-read",
  templateUrl: "./categoria-read.component.html",
  styleUrls: ["./categoria-read.component.css"],
})
export class CategoriaReadComponent implements OnInit {
  displayedColumns: string[] = ["id", "nome", "descricao", "acoes"];

  list_categorias: Categoria[] = [];

  constructor(private service: CategoriaService) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe((response) => {
      console.log(response)
      this.list_categorias = response;
    });
  }
}