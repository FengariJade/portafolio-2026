import { AbstractControl, FormGroup } from '@angular/forms';

/**
 * Retorna true si el campo del formulario es inválido y fue tocado.
 * Centraliza la lógica de validación visual para evitar duplicación.
 */
export function isInvalid(form: FormGroup, field: string): boolean {
  const control: AbstractControl | null = form.get(field);
  return !!(control?.invalid && control?.touched);
}
