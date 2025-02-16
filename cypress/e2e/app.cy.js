describe('User Table Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173'); // Ajusta la URL a la de tu aplicación
    });

    it('Should display the user table', () => {
        cy.get('table').should('be.visible'); // Verifica que la tabla es visible
    });

    it('Should have the correct number of rows', () => {
        cy.get('table tbody tr').should('have.length', 10); // Ajusta el número al número esperado de filas
    });

    it('Should contain specific user data', () => {
        cy.get('table tbody tr').eq(0).contains('td', 'Leanne Graham'); // Ajusta el texto para que coincida con un usuario en tu tabla
    });

    it('Should filter users based on search input', () => {
        cy.get('input[placeholder="Buscar usuario..."]').type('Leanne'); // Introduce un valor en el campo de búsqueda
        cy.get('table tbody tr').should('have.length', 1); // Verifica que solo se muestra una fila
        cy.get('table tbody tr').eq(0).contains('td', 'Leanne Graham'); // Verifica que la fila contiene el usuario esperado
    });

    it('Should navigate to user detail page when a row is clicked', () => {
        cy.get('table tbody tr').eq(0).click(); // Haz clic en la primera fila
        cy.url().should('include', '/user/1'); // Verifica que la URL ha cambiado a la página de detalle del usuario
    });

    it('Should display a message when no users are found', () => {
        cy.get('input[placeholder="Buscar usuario..."]').type('Nonexistent User'); // Introduce un valor que no coincida con ningún usuario
        cy.contains('No se encontraron usuarios.').should('be.visible'); // Verifica que se muestra el mensaje de no encontrado
    });
});