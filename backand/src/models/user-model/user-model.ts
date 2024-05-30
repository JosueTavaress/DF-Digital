export interface IUsers {
  name: string,
  e_mail: string
}

/**
 * @openapi
 * components:
 *  schemas:
 *    UserSchema:
 *      type: object
 *      required:
 *        - name
 *        - e-mail
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
  e_mail: "josueferreira8.jf@gmai.com"
}]

export default user;