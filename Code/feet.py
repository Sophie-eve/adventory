cn=0
def name():
    global cn
    cn=int(input("Enter your credit card number:"))
    if len(str(cn))==15:
        if(str(cn)[0:2] in ["34","37"]):
           nm="AMEX"
        else:
            nm="Enter valid credit card no."
    elif len(str(cn))==16:
        if (str(cn)[0:2] in ["51","52","53","54","55"]):
            nm="MASTERCARD"
        elif (str(cn))[0]=="4":
            nm="VISA"
        else:
            nm="Enter valid credit card no."
    else:
        nm="Enter valid credit card no."
    return nm



def luhn():
    l=[]
    global cn
    l2=[]
    sums=0
    a=0
    cn2=(str(cn)[::-1])
    for j in range(1,len(cn2),2):
        l.append(int(cn2[j]))
    for i in l:
        if i*2 >= 10:
            l2.append((i*2)-9)
        else:
            l2.append(i*2)
    for i in l2:
        sums+=i
    for j in range(0,len(cn2),2):
        sums+=int(cn2[j])
    if sums%10==0:
        print("your credit card number is valid")
    else:
        print("your credit card number is invalid")


print(name())
luhn()