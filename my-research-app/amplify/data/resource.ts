import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const roleEnum = a.enum(['STUDENT', 'PROFESSOR']);

const schema = a.schema({
  Role: roleEnum,

  Profile: a.model({
    email: a.string(),
    role: a.ref('Role').required(),
  }).authorization(allow => [
    allow.owner()
  ]),

  Project: a.model({
    title: a.string().required(),
    description: a.string().required(),
    // We now specify that the 'projectId' field on the Application model
    // is what connects them.
    applications: a.hasMany('Application', 'projectId'),
  }).authorization(allow => [
    allow.owner(),
    allow.authenticated().to(['read'])
  ]),

  Application: a.model({
    // We add an explicit field to store the ID of the project.
    projectId: a.id().required(),
    // We specify that this 'projectId' field is what connects this
    // Application back to a Project.
    project: a.belongsTo('Project', 'projectId'),
  }).authorization(allow => [
    allow.owner()
  ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});