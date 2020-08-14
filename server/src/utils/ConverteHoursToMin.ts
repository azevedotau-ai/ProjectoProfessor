export default function Converter(tempo:string){
   const [hour, minutes] =  tempo.split(':').map(Number);
   const timeMinutos = (hour * 60) + minutes;

   return timeMinutos;
}