import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-gest-form-tester',
  templateUrl: './gest-form-tester.component.html',
  styleUrls: ['./gest-form-tester.component.scss']
})
export class GestFormTesterComponent {
  listOfNumbers : number[] = [];
  listOfTestedNumbers : string[] = [];

  maxListSize = 10000;

  maxValue = 1000;
  minValue = -1000;

  form = new FormGroup({
    numberOfElement: new FormControl(50, Validators.compose(
      [Validators.min(1), Validators.max(this.maxListSize), Validators.required]))
  });

  /**
   * Generate a list of n random integer and do the GestForm Test for each.<br>
   * If the number is divisible by none, save the integer <br>
   * If the number is divisible by 3, save 'Gest' instead <br>
   * If the number is divisible by 5, save 'Form' instead <br>
   * If the number is divisible by both, save 'GestForm' instead <br>
   * <br>
   * The number n is defined by the formControl : numberOfElement <br>
   */
  generateList() {
    this.listOfNumbers = [];
    this.listOfTestedNumbers = [];

    if(this.form.controls.numberOfElement.value !== null) {

      for (let i = 0; i < this.form.controls.numberOfElement.value; i++) {
        const generatedNumber = this.getRandomIntInclusive();
        this.listOfNumbers.push(generatedNumber);

        switch (this.testForm(generatedNumber)) {
          case 0: {
            this.listOfTestedNumbers.push(String(generatedNumber));
            break;
          }
          case 1: {
            this.listOfTestedNumbers.push('Gest');
            break;
          }
          case 2: {
            this.listOfTestedNumbers.push('Form');
            break;
          }
          case 3: {
            this.listOfTestedNumbers.push('GestForm');
            break;
          }
        }
      }
    }
  }

  /**
   * Return a random integer between two values defined in the component.<br>
   * Min value defined by minValue.<br>
   * Max value defined by maxValue.<br>
   *
   * @return the random integer
   */
  getRandomIntInclusive() {
    this.minValue = Math.ceil(this.minValue);
    this.maxValue = Math.floor(this.maxValue);
    return Math.floor(Math.random() * (this.maxValue - this.minValue + 1) + this.minValue);
  }

  /**
   * Test if the number in param is divisible by 3 and 5.<br>
   * Return 0 if it is not divisible by either.<br>
   * Return 1 if it is only divisible by 3.<br>
   * Return 2 if it is only divisible by 5.<br>
   * Return 3 if it is divisible by 3 and 5.<br>
   *
   * @param numb : number to test.
   * @return the result of the test.
   */
  testForm(numb: number) {
    let result = 0;
    if (numb % 3 === 0) {
      result = result + 1;
    }
    if (numb % 5 === 0 ) {
      result = result + 2;
    }
    return result;
  }

  /**
   * Get error message for the FormControl of numberOfElement if value is not valid.
   *
   * @return the error message.
   */
  getErrorMessage() {
    return 'Entier compris entre 1 et ' + this.maxListSize;
  }

}
