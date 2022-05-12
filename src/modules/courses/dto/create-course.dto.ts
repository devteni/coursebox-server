export class CreateCourseDto {}

type File = {
  fieldname: string;
  originalname: string;
  path: string;
  mimetype: string;
  encoding: string;
  buffer: Buffer;
};
export class CreateCourseMaterial {
  title: string;
  description: string;
  courseId: number;
  file: File;
}
