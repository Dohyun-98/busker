import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class FilesService {
  async uploadFiles({ files }) {
    // 파일을 클라우드 스토리지에 저장
    const waitedFiles = await Promise.all(files);

    // storage 셋팅
    const bucket = process.env.GCP_BUSKER_BUCKET;
    const storage = new Storage({
      projectId: process.env.GCP_BUSKER_PROJECT_ID,
      keyFilename: process.env.GCP_BUSKER_KEY_FILE_NAME,
    }).bucket(bucket);

    // 스토리지에 파일 올리기
    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise((resolve, reject) => {
            el.createReadStream().pipe(
              storage
                .file(el.filename)
                .createWriteStream()
                .on('finish', () => resolve(`${bucket}/${el.filename}`))
                .on('error', () => reject('실패')),
            );
          }),
      ),
    );
    // 다운로드 URL 브라우저 전송
    return results;
  }

  uploadFile({ file }) {
    // storage 셋팅
    const uuid = uuid4();
    const bucket = process.env.GCP_BUSKER_BUCKET;
    const storage = new Storage({
      projectId: process.env.GCP_BUSKER_PROJECT_ID,
      keyFilename: process.env.GCP_BUSKER_KEY_FILE_NAME,
    }).bucket(bucket);

    // 스토리지에 파일 올리기
    const result = file
      .createReadStream()
      .pipe(storage.file(`${uuid}${file.filename}`).createWriteStream());
    if (result) {
      return `${uuid}${file.filename}`;
    } else {
      throw new UnprocessableEntityException('실패');
    }
  }
}
