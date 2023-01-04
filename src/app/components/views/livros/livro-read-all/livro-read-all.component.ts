import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.models';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {
  displayedColumns: string[] = ["id", "titulo",'lerLivro' ,"acoes"];

  id_cat : String = ''
  listLivros : Livro[] = []

  constructor(private service: LivroService, private router:Router ,private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
    this.findAllLivroByCategoria()
  }

  findAllLivroByCategoria():void {
    this.service.findAllByCategoria(this.id_cat).subscribe((response) =>{
      this.listLivros = response
    })
  }

  voltar() {
    this.router.navigate(["categorias"]);
  }
  navegarParaCriarLivro(){
    this.router.navigate([`categorias/${this.id_cat}/livros/create`])
  }
}
