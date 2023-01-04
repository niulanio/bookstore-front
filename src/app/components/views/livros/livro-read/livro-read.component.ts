import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.models';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit {

  livro: Livro = {
    id: "",
    titulo: "",
    nome_autor: "",
    texto: "",
  };
  id_cat: String = "";


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



  voltar() {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

}
