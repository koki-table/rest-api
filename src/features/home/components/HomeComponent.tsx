import { FC } from 'react'
import { useFetchMessage } from "../hooks/useFetchMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { convertUtcToLocal } from '../../../utils/day/convertUtcToLocal/convertUtcToLocal';
import styles from './HomeComponent.module.css';

const schema = z.object({
  id: z.number()
    .refine(value => value.toString().length === 6),
});

export const HomeComponent: FC = () => {
  const { data, error, loading, fetchRequest } = useFetchMessage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  if (loading) return <div>...loading</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.content}>
      <form onSubmit={handleSubmit((data) => fetchRequest(data.id))}>
        <input {...register("id", { valueAsNumber: true })} />
        {errors.id && <p>6桁の数字を入力してください</p>}
        <input type="submit" />
      </form>
      {data && (
        <div>
          <p>id: {data?.id}</p>
          <p>送信者: {data?.sender}</p>
          <p>送信時間: {convertUtcToLocal(data?.sentTime)}</p>
          <p>タイトル: {data?.title}</p>
          <p>優先度:{data?.priority}</p>
        </div>
      )}
    </div>
  );
}


