@isTest
public class PruebaTriggerTest {
    @isTest
    public static void testPruebaTrigger() {
        Prueba__c nuevaPrueba = new Prueba__c();

        insert nuevaPrueba;

        nuevaPrueba = [
            SELECT Descripcion__c
            FROM Prueba__c
            WHERE Id = :nuevaPrueba.Id
        ];

        System.assertEquals('test trigger', nuevaPrueba.Descripcion__c, 'El valor de Descripción__c no es correcto.');
    }
}
