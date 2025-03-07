public with sharing class ContactController {


    @AuraEnabled(cacheable=true)
    public static List<Contact> obtainAllContacts() {

        List<Contact> allContacts;
        allContacts = [SELECT Id, FirstName, LastName, Email FROM Contact];
        return allContacts;
    }

    @AuraEnabled
    public static Contact newContact(String firstName, String lastName, String email) {
        Contact newContact = new Contact(
            FirstName = firstName,
            LastName = lastName,
            Email = email
        );

        try 
        {    insert newContact;
             return newContact;
        } catch (Exception e) 
        {
            throw new AuraHandledException('Error al crear el contacto: ' + e.getMessage());
        }
    }

}