import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/interfaces';
import { GameService } from '../../services/game.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  games: Game[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getNominados()
    .subscribe( response => {
      console.log(response);
      this.games = response
    } )
  }

  votarJuego(game :Game){    
    this.gameService.votarjuego(game.id)
    .subscribe( (resp:any) => {
      console.log(resp)
      if(resp.ok){
        Swal.fire('Gracias',resp.message,'success');
      } else {
        Swal.fire('Oops',resp.message,'error');
      }
    })
  }

}
