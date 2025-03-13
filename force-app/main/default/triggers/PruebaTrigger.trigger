trigger PruebaTrigger on Prueba__c(before insert) {
  for (Prueba__c p : Trigger.new) {
    p.Descripcion__c = 'test trigger';
  }
}
