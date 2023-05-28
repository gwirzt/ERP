const router = require('express').Router();

const { Empresa } = require('../../db');




/**
 * @swagger
 * components:
 *  schemas:
 *     Empresa:
 *      type: object
 *      properties:
 *          id:
 *              type: integer       
 *              readOnly: true
 *          nombre:
 *              type: string
 *          direccion:
 *              type: string
 *          telefono:
 *              type: string
 *          email:
 *              type: string
 *          cuit:
 *              type: integer
 *      required:
 *          - nombre
 *          - direccion
 *          - telefono
 *          - email
 *          - cuit
 * 
 */



/**
 * @swagger
 * /api/empresas:
 *  post:
 *    summary: Crea una empresa.
 *    tags: [Empresa]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Empresa'
 *    responses:
 *      200:
 *        description: Empresa creada correctamente.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Empresa'
 *      400:
 *        description: Ya existe una empresa con ese CUIT.
 *      500:
 *        description: Error interno del servidor.
 *  security:
 *     - bearerAuth: []
 *      
 */
router.post('/', async (req, res) => {
    const existeEmpresa = await Empresa.findOne({ where: { cuit: req.body.cuit } });

    if (existeEmpresa) {
        return res.status(400).json({ error: 'Ya existe una empresa con ese CUIT' });
    } else {
        const empresa = await Empresa.create(req.body);
        res.json(empresa);
    }
});
/**
 * @swagger
 * /api/empresas/{id}:
 *  put:
 *      summary: Actualiza una empresa existente
 *      tags: [Empresas]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID de la empresa a actualizar
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Empresa'
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Empresa'
 */

router.put('/:empresaId', async (req, res) => {
    await Empresa.update(req.body, {
        where: { id: req.params.empresaId }
    });
    res.json({ success: 'Se ha modificado la empresa' });
});



/**
 * @swagger
 * /api/empresas:
 *  get:
 *      summary: Retorna todas las empresas
 *      tags: [Empresas]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *        - in: header
 *          name: user-token
 *          type: string
 *          required: true
 *          description: El token de autenticación recibido al iniciar sesión.
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Empresa'
 */
router.get('/', async (req, res) => {
    const empresas = await Empresa.findAll();
    res.json(empresas);
});

module.exports = router;



