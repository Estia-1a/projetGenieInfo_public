readarray -t commands < commands

#for each arguments
while [ $# -gt 0 ]
do
    name=$1
    #strip the bmp extension from name
    base=${name%.*}
    #create the directory if it doesn't exist
    mkdir -p $base
    #copy the image to the directory
    cp $name $base/base.bmp
    #run the programm
    #for each command in commands
    for command in "${commands[@]}" 
    do
        ./dist/freud-prof -f $base/base.bmp -c $command 2> /dev/null >> $base/commands.txt
        if [ $? -eq 0 ]
        then
            #if the programm is ok, copy the result to the directory
            mv image_out.bmp $base/${command// /_}.bmp
        else
            #if the programm is not ok, print an error message with the faulty command and the name of the image
            echo "Error in the command $command for the image $name"
        fi
        #replace all space in command with _
        
    done
    shift
done