const yup = require('yup');
const firebase = require('firebase');
const formatISO = require('date-fns/formatISO');

const config = require('../../utils/config');
const { admin, db } = require('../../utils/admin');
const validationWording = require('../../constants/validationWording');
const currentRole = ['admin', 'user'];
exports.signup = async (req, res) => {
  const { body } = req;
  const shape = {
    email: yup
      .string()
      .email(validationWording.invalid('email'))
      .required(validationWording.required('email')),
    password: yup
      .string()
      .min(8, validationWording.minLength(8))
      .required(validationWording.required('password')),
    name: yup.string().required(validationWording.required('name')),
    role: yup
      .mixed()
      .oneOf(currentRole, validationWording.oneOf('role', currentRole))
      .required(validationWording.required('role')),
  };
  const schema = yup.object().shape(shape);
  const validatedBody = schema.validateSync(body);
  const defaultImg = 'no-user-pic.png';
  // TODO Validate Data
  // If email not email and if password is not valid

  const data = await firebase
    .auth()
    .createUserWithEmailAndPassword(
      validatedBody.email,
      validatedBody.password
    );
  const userId = data.user.uid;
  const token = data.user.getIdToken();
  const newUser = {
    userId,
    ...validatedBody,
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${defaultImg}?alt=media`,
    createdAt: formatISO(new Date(), { locale: 'id' }),
  };
  await db.doc(`users/${userId}`).set(newUser);

  res.json({
    message: 'Successfully Sign Up',
    success: true,
    data: newUser,
    token,
  });
};

// export const getMyExpedition = async (req: Request, res: Response) => {
//   const user: IUserModel = res.locals.decoded.data;
//   const { sorted, page, limit } = req.query;
//   if (!user.access.access.sendSampleAccessType) {
//     throw new AccessError('send sample');
//   }
//   const typeExp =
//     user.access.access.sendSampleAccessType === 'lab' ? 'abroad' : 'domestic';

//   const filterValue = filteredToSearch(
//     JSON.stringify([{ id: 'type', value: typeExp }])
//   );
//   const sortedValue = sortedToSearch(sorted);

//   const repository = new ExpeditionRepository();
//   const data = await repository.find(filterValue, sortedValue, page, limit);

//   res.json({
//     data,
//     message: 'Successfully Get All My Expedition',
//   });
// };

// export const createExpedition = async (req: Request, res: Response) => {
//   const { body, query, params } = req;
//   const validation = yup.object().shape({
//     name: yup.string().required(validationWording.required('name')),
//     type: yup
//       .mixed<keyof typeof ExpeditionType>()
//       .required(validationWording.required('type'))
//       .oneOf(
//         getAllEnumkey(ExpeditionType),
//         validationWording.oneOf('type', ...getAllEnumkey(ExpeditionType))
//       ),
//   });
//   const validatedBody = validation.validateSync(body);

//   const repository = new ExpeditionRepository();
//   const Expedition = await repository.create({
//     name: validatedBody.name,
//     type: validatedBody.type as keyof typeof ExpeditionType,
//     isMaster: false,
//   });

//   res.json({
//     data: Expedition,
//     message: 'Successfully Create Expedition',
//     note:
//       'Expedition yang bukan merupakan bawaan sistem tidak memiliki fitur tracking',
//   });
// };

// export const deleteExpedition = async (req: Request, res: Response) => {
//   const { params } = req;
//   const paramValidation = yup.object().shape({
//     expeditionId: yup
//       .string()
//       .required(validationWording.required('expeditionId')),
//   });
//   const validatedParam = paramValidation.validateSync(params);
//   const repository = new ExpeditionRepository();

//   const current = await repository.findById(validatedParam.expeditionId);
//   if (!current) {
//     throw new NotFoundError(
//       validationWording.notFound('expedition'),
//       'expedition'
//     );
//   }
//   if (current.isMaster === true) {
//     return res.status(403).json({
//       message: 'Tidak boleh manghapus expedition bawaan',
//       error: true,
//     });
//   }

//   const deleted = await repository.removeById(validatedParam.expeditionId);
//   res.json({
//     data: deleted,
//     message: 'Successfully Delete Expedition',
//   });
// };

// export const updateExpedition = async (req: Request, res: Response) => {
//   const { body, query, params } = req;
//   const paramValidation = yup.object().shape({
//     expeditionId: yup
//       .string()
//       .required(validationWording.required('expeditionId')),
//   });
//   const validation = yup.object().shape({
//     name: yup.string(),
//     type: yup
//       .mixed<keyof typeof ExpeditionType>()
//       .oneOf(
//         getAllEnumkey(ExpeditionType),
//         validationWording.oneOf(
//           'ExpeditionType',
//           ...getAllEnumkey(ExpeditionType)
//         )
//       ),
//   });
//   const validatedParam = paramValidation.validateSync(params);
//   const validatedBody = validation.validateSync(body, {
//     stripUnknown: true,
//   });

//   const repository = new ExpeditionRepository();

//   const current = await repository.findById(validatedParam.expeditionId);
//   if (!current) {
//     throw new NotFoundError(
//       validationWording.notFound('expedition'),
//       'expedition'
//     );
//   }
//   if (current.isMaster === true) {
//     return res.status(403).json({
//       message: 'Tidak boleh mengubah expedition bawaan',
//       error: true,
//     });
//   }
//   const updated = await repository.updateById(
//     validatedParam.expeditionId,
//     validatedBody
//   );

//   res.json({
//     message: 'successfully Update Expedition',
//     data: updated,
//   });
// };
