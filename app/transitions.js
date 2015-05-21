import Ember from "ember";

export default function(){
  this.transition(
    this.childOf('#liquid-bind-demo'),
    this.use('toRight')
  );

}