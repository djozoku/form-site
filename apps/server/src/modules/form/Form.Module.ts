import FormEntity from './Form.Entity';
import AddFormDocumentResolver from './resolvers/AddFormDocument.Resolver';
import CreateFormResolver from './resolvers/CreateForm.Resolver';
import DeleteFormResolver from './resolvers/DeleteForm.Resolver';
import GetFormDataResolver from './resolvers/GetFormData.Resolver';
import GetFormDataDisplaysResolver from './resolvers/GetFormDataDisplays.Resolver';
import GetFormFieldInputDataResolver from './resolvers/GetFormFieldInputData.Resolver';
import GetFormRawDataResolver from './resolvers/GetFormRawData.Resolver';
import FormResolver from './resolvers/Form.Resolver';

const FormModule = {
  Entity: FormEntity,
  Resolvers: [
    AddFormDocumentResolver,
    CreateFormResolver,
    DeleteFormResolver,
    GetFormDataResolver,
    GetFormDataDisplaysResolver,
    GetFormFieldInputDataResolver,
    GetFormRawDataResolver,
    FormResolver
  ]
};

export default FormModule;
