import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { colaborador } from 'src/app/models/colaborador';
import { ColaboradorService } from 'src/app/services/colaborador.service';

@Component({
  selector: 'app-colaborador-delete',
  templateUrl: './colaborador-delete.component.html',
  styleUrls: ['./colaborador-delete.component.css']
})
export class ColaboradorDeleteComponent implements OnInit {

  colaborador: colaborador = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''

  }




  constructor(private service: ColaboradorService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.colaborador.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById():void{
    this.service.findById(this.colaborador.id ).subscribe( resposta =>{
      resposta.perfis = [];
      this.colaborador = resposta;
    })
  }

  delete(): void{
    this.service.delete(this.colaborador.id).subscribe( () => { 
      this.toast.success('Colaborador deletado com sucesso', 'Exclusão concluida');
      this.router.navigate(['colaboradores'])
    }, ex =>{
      console.log(ex);
      if(ex.error.errors){
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }



  
}
