import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestFormTesterComponent } from './gest-form-tester.component';

describe('GestFormTesterComponent', () => {
  let component: GestFormTesterComponent;
  let fixture: ComponentFixture<GestFormTesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestFormTesterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestFormTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate 50 numbers', () => {
    component.generateList();

    expect(component.listOfNumbers).toHaveSize(50);
    expect(component.listOfTestedNumbers).toHaveSize(50);
  });

  it('should generate 1 number not divisible', () => {
    component.form.controls.numberOfElement.setValue(1);
    spyOn(Math, "floor").and.returnValue(7);

    component.generateList();

    expect(component.listOfNumbers).toHaveSize(1);
    expect(component.listOfNumbers[0]).toEqual(7);
    expect(component.listOfTestedNumbers).toHaveSize(1);
    expect(component.listOfTestedNumbers[0]).toEqual('7');
  });

  it('should generate 1 number divisible only by 3', () => {
    component.form.controls.numberOfElement.setValue(1);
    spyOn(Math, "floor").and.returnValue(3);

    component.generateList();

    expect(component.listOfNumbers).toHaveSize(1);
    expect(component.listOfNumbers[0]).toEqual(3);
    expect(component.listOfTestedNumbers).toHaveSize(1);
    expect(component.listOfTestedNumbers[0]).toEqual('Gest');
  });

  it('should generate 1 number divisible only by 5', () => {
    component.form.controls.numberOfElement.setValue(1);
    spyOn(Math, "floor").and.returnValue(5);

    component.generateList();

    expect(component.listOfNumbers).toHaveSize(1);
    expect(component.listOfNumbers[0]).toEqual(5);
    expect(component.listOfTestedNumbers).toHaveSize(1);
    expect(component.listOfTestedNumbers[0]).toEqual('Form');
  });

  it('should generate 1 number divisible by 3 and 5', () => {
    component.form.controls.numberOfElement.setValue(1);
    spyOn(Math, "floor").and.returnValue(15);

    component.generateList();

    expect(component.listOfNumbers).toHaveSize(1);
    expect(component.listOfNumbers[0]).toEqual(15);
    expect(component.listOfTestedNumbers).toHaveSize(1);
    expect(component.listOfTestedNumbers[0]).toEqual('GestForm');
  });

  it('should generate integers between to values', () => {
    let numberToTest: number;

    for (let i = 0; i < 20; i++) {
      numberToTest = component.getRandomIntInclusive();
      expect(numberToTest).toBeGreaterThanOrEqual(component.minValue);
      expect(numberToTest).toBeLessThanOrEqual(component.maxValue);
    }
  });

  it('should do the testForm and return 0', () => {
    const dataToTest: number[] = [1, 2, 8, 29, 34, 73, 74, 83];
    let result: number;

    for (let i = 0; i < dataToTest.length; i++) {
      result = component.testForm(dataToTest[i]);
      expect(result).toEqual(0);
    }
  });

  it('should do the testForm and return 1', () => {
    const dataToTest: number[] = [3, 6, 27, 36, 78, 81, 108, 111];
    let result: number;

    for (let i = 0; i < dataToTest.length; i++) {
      result = component.testForm(dataToTest[i]);
      expect(result).toEqual(1);
    }
  });

  it('should do the testForm and return 2', () => {
    const dataToTest: number[] = [5, 10, 20, 25, 35, 65, 70, 100];
    let result: number;

    for (let i = 0; i < dataToTest.length; i++) {
      result = component.testForm(dataToTest[i]);
      expect(result).toEqual(2);
    }
  });

  it('should do the testForm and return 3', () => {
    const dataToTest: number[] = [15, 30, 120, 135, 165, 210, 225, 270];
    let result: number;

    for (let i = 0; i < dataToTest.length; i++) {
      result = component.testForm(dataToTest[i]);
      expect(result).toEqual(3);
    }
  });

  it('should return a string with maxListSize', () => {
    let messageToTest = component.getErrorMessage();
    expect(messageToTest).toContain(String(component.maxListSize));
  });
});
