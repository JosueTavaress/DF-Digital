export interface IUsers {
  name: string,
  email: string
}

/**
 * @openapi
 * components:
 *  schemas:
 *    UserSchema:
 *      type: object
 *      required:
 *        - name
 *        - email
 *      properties:
 *        name:
 *          type: string
 *          default: Josué
 *        e-mail:
 *          type: string
 *          default: josueferreira8.jf@gmail.com
 */
const user: IUsers[] = [{
  name: "josué",
  email: "josueferreira8.jf@gmai.com"
}]

export default user;