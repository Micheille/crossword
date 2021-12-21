#################################################################
####################### BUILD STAGE #############################
#################################################################
FROM maven:3.6.3-jdk-14 as builder

WORKDIR /opt/crossword-server/app-build/

# Copy maven settings
COPY    pom.xml ./

# Copy project sources
COPY    src ./src

# Build jar
RUN     mvn clean package -Dmaven.test.skip=true

##################################################################
######################## TARGET STAGE ############################
##################################################################
# Use the image version used on the build stage
FROM adoptopenjdk/openjdk14:ubi

# Set unified timezone
ENV     TZ Europe/Moscow

# Copy built jar
COPY    --from=builder --chown=root /opt/crossword-server/app-build/target/*.jar /opt/crossword-server/lib/

# Copy launcher and some additional files if needed
COPY    --chown=root docker/main /opt/crossword-server

# Set env vars to configure app launch
ENV     CPU_CORES 1
ENV     JAVA_XMS 128m
ENV     JAVA_XMX 256m

CMD ["/opt/crossword-server/run.sh"]
