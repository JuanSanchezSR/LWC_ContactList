@isTest
public class PruebaTriggerTest {
  @isTest
  public static void testPruebaTrigger() {
    // Crea un nuevo registro de Prueba__c
    Prueba__c nuevaPrueba = new Prueba__c();
    // No asignamos valor a Descripción__c, ya que el trigger lo asignará
    insert nuevaPrueba;

    // Recuperamos el registro recién insertado
    nuevaPrueba = [
      SELECT Descripción__c
      FROM Prueba__c
      WHERE Id = :nuevaPrueba.Id
    ];

    // Verifica que el valor de Descripción__c sea 'test trigger'
    System.assertEquals(
      'test trigger',
      nuevaPrueba.Descripción__c,
      'El valor de Descripción__c no es correcto.'
    );
  }
}
