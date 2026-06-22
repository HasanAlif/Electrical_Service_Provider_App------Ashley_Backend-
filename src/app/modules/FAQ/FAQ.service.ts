import httpStatus from 'http-status';
import { AppError } from '../../utils';
import FAQModel from './FAQ.model';

type TFAQPayload = {
  question: string;
  answer: string;
};

const createFAQ = async (payload: TFAQPayload) => {
  return FAQModel.create(payload);
};

const getAllFAQs = async () => {
  return FAQModel.find().sort({ createdAt: -1 });
};

const getSingleFAQ = async (id: string) => {
  const faq = await FAQModel.findById(id);

  if (!faq) {
    throw new AppError(httpStatus.NOT_FOUND, 'FAQ not found!');
  }

  return faq;
};

const updateFAQ = async (id: string, payload: Partial<TFAQPayload>) => {
  const faq = await FAQModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!faq) {
    throw new AppError(httpStatus.NOT_FOUND, 'FAQ not found!');
  }

  return faq;
};

const deleteFAQ = async (id: string) => {
  const faq = await FAQModel.findByIdAndDelete(id);

  if (!faq) {
    throw new AppError(httpStatus.NOT_FOUND, 'FAQ not found!');
  }

  return faq;
};

export const FAQService = {
  createFAQ,
  getAllFAQs,
  getSingleFAQ,
  updateFAQ,
  deleteFAQ,
};
