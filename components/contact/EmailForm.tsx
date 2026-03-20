'use client';

import * as React from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Controller,
  type ControllerFieldState,
  type ControllerRenderProps,
  useForm,
} from 'react-hook-form';

import { Trans } from '@/types';
import Iconify from '@/components/shared/Iconify';
import { getTextDirection } from '@/lib/getTextDirection';
import { emailRegex, textRegex } from '@/data/variables';
import { useNotification } from '../layout/NotificationsProvider';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';

type Props = { t: Trans['contact']; lang: string };

export default function EmailForm({ t, lang }: Props) {
  const addNotification = useNotification();
  const [isLoading, setIsLoading] = React.useState(false);

  const formSchema = React.useMemo(
    () =>
      z.object({
        name: z
          .string()
          .trim()
          .refine((val) => textRegex.test(val), {
            message: t.errors.invalid_name,
          }),
        email: z
          .string()
          .trim()
          .refine((val) => emailRegex.test(val), {
            message: t.errors.invalid_email,
          }),
        subject: z
          .string()
          .trim()
          .refine((val) => textRegex.test(val), {
            message: t.errors.invalid_subject,
          }),
        message: z
          .string()
          .trim()
          .refine((val) => textRegex.test(val), {
            message: t.errors.invalid_message,
          }),
      }),
    [t.errors],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    mode: 'onChange',
  });

  // submit the email to the backend api route to be sent securely
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const body = {
        name: values.name.trim(),
        subject: values.subject.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      }
      const jsonResponse = await fetch(`/api/sendEmail?lang=${lang}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!jsonResponse.ok) {
        // If response is not ok, try to parse error message
        const errorData = await jsonResponse.json().catch(() => ({
          message: t.errors.default,
        }));
        throw new Error(errorData.message || t.errors.default);
      }

      const response = await jsonResponse.json();
      if (response?.status === 200) {
        form.reset();
        addNotification({
          message: response.message || t.success,
          status: 'success',
        });
      } else {
        throw new Error(response.message || t.errors.default);
      }
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.response?.data?.message || t.errors.default;
      addNotification({
        message: errorMessage,
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      data-aos="fade-in-right"
      id="contact-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <FieldGroup>
        {/* ---------- NAME FIELD ---------- */}
        <Controller
          name="name"
          control={form.control}
          render={({
            field,
            fieldState,
          }: {
            field: ControllerRenderProps<z.infer<typeof formSchema>, 'name'>;
            fieldState: ControllerFieldState;
          }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="relative h-12">
                <Input
                  {...field}
                  id="form-name"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                  dir={
                    field.value?.trim()
                      ? getTextDirection(field.value.trim())
                      : ''
                  }
                  placeholder=" "
                  className="peer h-full rounded-full ps-10 pt-4 pb-1 bg-white/90 focus:bg-white dark:bg-background/60 dark:focus:bg-background/80"
                />
                <InputGroupAddon className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <Iconify icon="fa:user" />
                </InputGroupAddon>
                <label
                  htmlFor="form-name"
                  className="pointer-events-none absolute left-10 top-1 text-xs text-muted transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:text-accent"
                >
                  {t.name}
                </label>
              </div>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* ---------- EMAIL FIELD ---------- */}
        <Controller
          name="email"
          control={form.control}
          render={({
            field,
            fieldState,
          }: {
            field: ControllerRenderProps<z.infer<typeof formSchema>, 'email'>;
            fieldState: ControllerFieldState;
          }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="relative h-12">
                <Input
                  {...field}
                  id="form-email"
                  type="email"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                  dir={field.value?.trim() ? 'ltr' : ''}
                  placeholder=" "
                  className="peer h-full rounded-full ps-10 pt-4 pb-1 bg-white/90 focus:bg-white dark:bg-background/60 dark:focus:bg-background/80"
                />
                <InputGroupAddon className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <Iconify icon="fa:envelope" />
                </InputGroupAddon>
                <label
                  htmlFor="form-email"
                  className="pointer-events-none absolute left-10 top-1 text-xs text-muted transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:text-accent"
                >
                  {t.email}
                </label>
              </div>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* ---------- SUBJECT FIELD ---------- */}
        <Controller
          name="subject"
          control={form.control}
          render={({
            field,
            fieldState,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof formSchema>,
              'subject'
            >;
            fieldState: ControllerFieldState;
          }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="relative h-12">
                <Input
                  {...field}
                  id="form-subject"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                  dir={
                    field.value?.trim()
                      ? getTextDirection(field.value.trim())
                      : ''
                  }
                  placeholder=" "
                  className="peer h-full rounded-full ps-10 pt-4 pb-1 bg-white/90 focus:bg-white dark:bg-background/60 dark:focus:bg-background/80"
                />
                <InputGroupAddon className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <Iconify icon="fa:info-circle" />
                </InputGroupAddon>
                <label
                  htmlFor="form-subject"
                  className="pointer-events-none absolute left-10 top-1 text-xs text-muted transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:text-accent"
                >
                  {t.subject}
                </label>
              </div>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* ---------- MESSAGE FIELD ---------- */}
        <Controller
          name="message"
          control={form.control}
          render={({
            field,
            fieldState,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof formSchema>,
              'message'
            >;
            fieldState: ControllerFieldState;
          }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="relative h-28">
                <InputGroupTextarea
                  {...field}
                  id="form-message"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                  dir={
                    field.value?.trim()
                      ? getTextDirection(field.value.trim())
                      : ''
                  }
                  placeholder=" "
                  rows={5}
                  className="peer resize-none pt-5 bg-white/90 focus:bg-white dark:bg-background/60 dark:focus:bg-background/80"
                />
                <label
                  htmlFor="form-message"
                  className="pointer-events-none absolute left-10 top-2 text-xs text-muted transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:text-accent"
                >
                  {t.message}
                </label>
              </div>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </FieldGroup>

      {/* ---------- SUBMIT BUTTON ---------- */}
      <div className="button-area">
        <Button
          data-aos="fade-up"
          data-aos-offset="0"
          type="submit"
          className="px-6 py-2 mt-5"
          // disabled={!form.formState.isValid || isLoading}
          disabled={isLoading}
        >
          {t.submit}{' '}
          <Iconify icon="fa:paper-plane" />
        </Button>
      </div>
    </form>
  );
}
