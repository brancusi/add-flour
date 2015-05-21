import Ember from 'ember';
import AceEditor from 'ace/ace';

export default Ember.Component.extend({

  //---------------------------
  // Properties
  //---------------------------
  tagName:'div',
  classNames:['recipe-instruction'],

  ace: Ember.inject.service(),

  _aceItemTokens: Ember.A(),

  tokenizerChanged: function(){
    var session = this.get('session');

    if(session){
      var tokenizer = this.get('ace.tokenizer');
      session.$mode.$tokenizer = tokenizer;
      session.bgTokenizer.setTokenizer(tokenizer);
      this.get('editor').renderer.updateText();
    }
    
  }.observes('ace.tokenizer', 'session'),

  didInsertElement: function(){

    var editor = AceEditor.edit(this.$('.editor')[0]);

    editor.setValue('Add 1 tbsp of salt');
    editor.clearSelection();

    var session = editor.getSession();

    session.setUseWrapMode(true);

    editor.setOptions({
      maxLines:5,
      fontSize:18,
      showPrintMargin:false,
      showGutter:false,
      highlightActiveLine:false,
      // enableBasicAutocompletion: true,
      // enableSnippets: true,
      // enableLiveAutocompletion: true
    });

    this.set('editor', editor);
    this.set('session', session);

    this._createListeners();

    this._refreshTokens();
  },

  _createListeners: function(){
    var _this = this;

    this.get('editor').on('change', _this._changeHandler.bind(_this));
    // this.get('session').on("changeMode", _this._modeChangedHandler.bind(_this));

  },

  _itemMatches: function(){
    var self = this;
    var tokens = this.get('_aceItemTokens');
    var newValue = null;

    if(!Ember.isEmpty(tokens)){
      
      tokens.forEach(function(token){
        var matches = self.get('store').all(token.type).filter(function(item){
          return item.get('name').toLowerCase() === token.value.toLowerCase();
        });

        if(!Ember.isEmpty(matches)){
          newValue = matches[0];

          if(matches.length > 1){
            console.log('Two items detected, alert to move to new line');
          }

        }
      })
    }

    if(newValue !== this.get('child')){
      this.set('model.child', newValue);
    }

  }.observes('_aceItemTokens'),

  _quantityMatches: function(){
    var self = this;
    var tokens = this.get('_aceQuantityTokens');

    var newUnitTypeValue = null;
    var newQuantityValue = null;

    if(!Ember.isEmpty(tokens)){
      
      tokens.forEach(function(token){
        var matches = self.get('store').all('unit-type').filter(function(unitType){
          return unitType.match('gram');
        });

        if(!Ember.isEmpty(matches)){

          var match = matches[0];

          newUnitTypeValue = match;
          newQuantityValue = 5;
          
          if(matches.length > 1){
            console.log('Two quantities detected, alert to move to new line');
          }

        }
      })
    }

    if(newUnitTypeValue !== this.get('unitType')){
      this.set('model.unitType', newUnitTypeValue);
    }

    if(newQuantityValue !== this.get('quantity')){
      this.set('model.quantity', newQuantityValue);
    }

  }.observes('_aceQuantityTokens'),

  _refreshTokens:function(){
    this.set('model.child', null);
    this.set('model.quantity', 0);

    var tokens = this.get('session').getTokens(0);
    var self = this;

    var items = tokens.filter(function(token){
      return (token.type === 'item' || token.type === 'composite' || token.type === 'product')
    });

    var quantities = tokens.filter(function(token){
      return token.type === 'quantity';
    });
    
    this.set('_aceItemTokens', items);
    this.set('_aceQuantityTokens', quantities);
  },

  _changeHandler: function(){
    this._refreshTokens();
  }

});